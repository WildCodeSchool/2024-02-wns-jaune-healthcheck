// back/src/subscribers/UrlSubscriber.ts
import { Not } from "typeorm";
import {
    EventSubscriber,
    EntitySubscriberInterface,
    UpdateEvent,
    InsertEvent,
    EntityManager,
} from "typeorm";
import { Url } from "../entities/Url";
import { History } from "../entities/History";
import axios from "axios";


@EventSubscriber()
export class UrlSubscriber implements EntitySubscriberInterface<Url> {
    listenTo() {
        return Url;
    }

    async afterInsert(event: InsertEvent<Url>) {
        if (!event.entity) return;

        // Utiliser une nouvelle transaction
        await event.manager.transaction(async (transactionalEntityManager) => {
            const url = await transactionalEntityManager.findOne(Url, {
                where: { id: event.entity.id },
            });
            if (url) {
                await this.logUrlResponse(url, transactionalEntityManager);
            }
        });
    }

    async afterUpdate(event: UpdateEvent<Url>) {
        await event.manager.transaction(async (transactionalEntityManager) => {
            if (!event.entity) return;
            const url = await transactionalEntityManager.findOne(Url, {
                where: { id: event.entity.id },
            });
            if (url) {
                await this.logUrlResponse(url, transactionalEntityManager);
            }
        });
    }

    private async logUrlResponse(
        url: Url,
        transactionalEntityManager: EntityManager,
    ) {
        try {
            const response = await axios.get(url.path, {
                validateStatus: () => true, // Do not throw on non-2xx status codes
            });

            const existingMessageHistory = await History.findOne({
                where: {
                    url: {
                        id: url.id,
                    },
                    response: Not(""),
                }
            });

            if (existingMessageHistory) {
                existingMessageHistory.response = response.data;
                existingMessageHistory.created_at = new Date();
                await transactionalEntityManager.save(existingMessageHistory);
                return;
            }
            
            const history = new History();
            history.url = url;
            history.response = response.data;
            history.status_code = response.status;

            await transactionalEntityManager.save(history);
        } catch (error) {
            console.error("Failed to log URL response", error);
        }
    }
}
