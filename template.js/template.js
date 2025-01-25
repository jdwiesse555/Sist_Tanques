export const getEmailTemplate = (data) => {
    const{email,token} = data;

    const emailUser = email.split('@')[0].toString();
    const url = 'https://fromtend-sist-tanques.vercel.app/resetclave';

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