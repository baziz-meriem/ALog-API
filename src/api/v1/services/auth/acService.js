const prisma = require('../../../../config/dbConfig')

const getAcById = async (id) => {

    try {
        const ac = await prisma.AC.findUnique({
            where: {
                id: id
            },
            select: {
                id: true,
                nom: true,
                prenom: true,
                email: true,
                numTel: true,
                mot_de_passe: false
            }
        });
        return ac;
    } catch (error) {
        return null;
    }
}

const getAcByEmail = async (email) => {

    try {
        const ac = await prisma.AC.findUnique({
            where: {
                email: email
            },
            select: {
                id: true,
                nom: true,
                prenom: true,
                email: true,
                numTel: true,
                mot_de_passe: true
            }
        });
        return ac;
    } catch (error) {
        return null;
    }
}



module.exports = { getAcById,getAcByEmail}