
export interface IUserStore {
    id: number;
    role_id: number;
    name: string;
    email: string;
    avatar: string;
    email_verified_at: null;
    settings: string;
    created_at: Date;
    updated_at: Date;
    cargo_id: number;
    persona_id: number;
    parent_id: null;
    default_filter: number;
    deleted_at: null;
    firma: null;
    isAdmin: boolean;
    roles: Role[];
    connect(): void
    children: any[];
    //@ts-ignore
    ongoingSaveOperation?: boolean;
    displayLoadingMessage?: boolean | string;
    has_privileged_role?: boolean;
}

export interface Role {
    id: number;
    name: string;
    guard_name: string;
    created_at: null;
    updated_at: null;
}
