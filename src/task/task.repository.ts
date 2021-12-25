import {
  DeleteResult,
  EntityManager,
  EntityRepository,
  getManager,
  TreeRepository,
} from 'typeorm';
import { Task } from './entities/task.entity';

@EntityRepository(Task)
export class TaskRepository extends TreeRepository<Task> {
  async delete(id: string): Promise<DeleteResult> {
    const result = await getManager().transaction(
      async (tem: EntityManager) => {
        const entity = await tem.findOneOrFail(Task, id, {
          relations: ['parent'],
        });

        if (!entity.parent) {
          throw Error('Unexcepted Error');
        }

        const table =
          this.metadata.closureJunctionTable.ancestorColumns[0].entityMetadata
            .tableName;
        const ancestor =
          this.metadata.closureJunctionTable.ancestorColumns[0].databasePath;
        const descendant =
          this.metadata.closureJunctionTable.descendantColumns[0].databasePath;

        const nodes = await tem
          .createQueryBuilder()
          .select(descendant)
          .from(table, 'closure')
          .where(`${ancestor} = :id`, { id })
          .getRawMany();

        const nodeIds = nodes.map((v) => v[descendant]);

        // delete all the nodes from the closure table
        await tem
          .createQueryBuilder()
          .delete()
          .from(table)
          .where(`${descendant} IN (:...ids)`, { ids: nodeIds })
          .execute();

        // delete the parent foreign key from the queries
        // otherwise we'll get a fk constraint when trying to delete
        await tem
          .createQueryBuilder()
          .relation(Task, 'parent')
          .of(nodeIds)
          .set(null);

        // delete the queries
        await tem.delete(Task, nodeIds);

        return nodeIds;
      },
    );

    return { raw: result, affected: result.length };
  }
}
