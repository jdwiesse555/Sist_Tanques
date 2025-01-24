import AWS from "aws-sdk"

export const generarURLFirmada = async (req,res) => {
    const s3 = new AWS.S3;
    const data = req.body;

    const url = s3.getSignedUrl("putObject",{
        Bucket: process.env.BUCKET_NAME,
        Key: data.nombreArchivo,
        Expires:60, //en segundos
        ContentType: data.contentType,
    });

    return res.json({
        content:url,
    })
}