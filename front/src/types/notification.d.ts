export type NotificationProps = {
    data: NotificationPartial;
};

type NotificationPartial = {
    content: Scalars["String"]["output"];
    created_at: Scalars["DateTimeISO"]["output"];
    id: Scalars["String"]["output"];
    is_read: Scalars["Boolean"]["output"];
};
