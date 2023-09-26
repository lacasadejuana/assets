import { TSharingLevel } from '@lacasadejuana/types';

export const sharingLevels = {
    private: {
        id: 'private',
        title: 'Privado',
        description: 'El mapa sólo será visible para usted y los administradores',
        icon: 'fa fa-lock',
    },
    shared: {
        id: 'shared',
        title: 'Compartido',
        description: 'Otros usuarios podrán ver el mapa, pero no guardar cambios',
        icon: 'fa fa-eye',
    },
    collaborative: {
        id: 'collaborative',
        title: 'Colaborativo',
        description: 'Otros usuarios podrán ver y guardar cambios el mapa',
        icon: 'fa fa-users',
    },
    public: {
        id: 'public',
        title: 'Público',
        description: 'Visitantes externos podrán ver una versión simplificada del mapa',
        icon: 'fa fa-globe',
    },
} as unknown as Record<string, TSharingLevel>;
