export type FormLoginProps = {
    setOpenDialog: (openDialog: boolean) => void;
    openDialog?: boolean;
};

export type FormAddUserUrlProps = {
    openDialog?: boolean;
    setOpenDialog: (openDialog: boolean) => void;
};

export type FormUpdateUserUrlNameProps = {
    openDialog?: boolean;
    closeDialog: () => void;
    urlId: string;
    currentName: string;
};

export type FormUpdateUserUrlFrequencyProps = {
    openDialog?: boolean;
    closeDialog: () => void;
    urlId: string;
    currentName: string;
};

export type FormUpdateUserUrlDeleteProps = {
    openDialog?: boolean;
    closeDialog: () => void;
    urlId: string;
    urlPath: string;
};