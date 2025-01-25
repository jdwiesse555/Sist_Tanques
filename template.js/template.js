export const getEmailTemplate = (data) => {
    const{email,token} = data;

    const emailUser = email.split('@')[0].toString();
    const url = 'https://frontend-sist-tanques.vercel.app';

    return (`
        <form>
            <div>
                <label>Hola ${emailUser}</label>
                <br>
                </br>
                <a href="${url}/${token}" target="_blank">Recuperar contraseña</a>

            </div>
        </form>
    `)

}