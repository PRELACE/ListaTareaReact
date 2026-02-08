import Avatar from 'react-avatar';

type TareaProps = {
    tarea: string;
    borrarTarea: () => void;
}

export const Tarea = ({ tarea, borrarTarea }: TareaProps) => {
    return (
        <div className="task">
            <Avatar
                src="https://thumbs.dreamstime.com/b/mascota-vectorial-de-avatar-juegos-lobo-gris-ojos-rojos-archivo-juego-ndash-incluye-el-eps-adobe-ilustrator-png-contacta-conmigo-259691835.jpg"
                size="40"
                round={true}
                className="task-avatar"
            />
            <span>{tarea}</span>
            <button onClick={borrarTarea}>Borrar</button>
        </div>
    )
}
