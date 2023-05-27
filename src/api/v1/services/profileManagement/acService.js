const prisma = require('../../../../config/dbConfig')
const bcrypt = require('bcrypt');
const { sendEmail } = require('../../middlewares/utils');


const getAllAcs = async () => {
    try {
        const acs = await prisma.aC.findMany({
            select:{
                id: true,
                nom: true,
                prenom: true,
                email: true,
                numTel: true,
                idClient: true,
                mot_de_passe: false
            }
        });
        return acs;
    } catch (error) {
        return (catchPrismaClientError(error));
    }
}

const getAcById = async (id) => {
    try {
        const ac = await prisma.aC.findUnique({
            where: {
                id: id
            },
            select: {
                id: true,
                nom: true,
                prenom: true,
                email: true,
                numTel: true,
                idClient: true,
                mot_de_passe: false
            }
        });
        return ac;
    } catch (error) {
        return (catchPrismaClientError(error));
    }
}

const createAc = async ({ nom, prenom, email, password, numTel, idClient }) => {

    try {
        const acExists = await prisma.aC.findUnique({
            where: {
                email: email
            }
        });
        if (acExists) {
            throw new Error('AC already exists');
        }
        const clientExists = await prisma.client.findFirst({
            where: {
                id: idClient
            }
        });
        if (!clientExists) {
            throw new Error('Client does not exist');
        }
        const hashPassword = await bcrypt.hash(password, 10);
        const ac = await prisma.aC.create({
            data: {
                nom: nom,
                prenom: prenom,
                email: email,
                mot_de_passe: hashPassword,
                numTel: numTel,
                idClient: idClient
            },
            select: {
                id: true,
                nom: true,
                prenom: true,
                email: true,
                numTel: true,
                idClient: true,
                mot_de_passe: false
            }
        });
        const message = `
        Dear ${nom} ${prenom}
        I am writing to provide you with your account credentials.
        You ve been registered with email : ${email} and Password : ${password} \n\n .`;
        try {
            await sendEmail({
              email: email,
              subject: `Your Account Credentials`,
              message,
            });
          } catch (error) {
              return error;
          }
        return ac;
    } catch (error) {
        console.log(error)
        return (error);
    }
}

module.exports = { getAllAcs, getAcById, createAc }