const prisma = require('../../../../config/dbConfig')

const getRoleByEmail = async (email) => {
    /**
     * @description get the agent (sadm , adm , decideur or ac) with email from the database and return it as an object or null if there is an error
     * @param {string} email
    */
    try {
        let agent = await prisma.AC.findUnique({
            where: {
                email: email
            }
        });
        if (agent) return "AC";
        agent = await prisma.aDM.findUnique({
            where: {
                email: email
            }
        });

        if (agent) return "ADM";
        agent = await prisma.decideur.findUnique({
            where: {
                email: email
            }
        });

        if (agent) return "Decideur";
        agent = await prisma.SADM.findUnique({
            where: {
                email: email
            }
        });
        if (agent) return "SADM";
        agent = await prisma.consommateur.findUnique({
            where: {
                email: email
            }
        });
        if (agent) return "Consommateur";
    } catch (error) {
        return null;
    }
}


module.exports = { getRoleByEmail }