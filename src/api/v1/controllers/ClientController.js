
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()


async function addClient(req, res, next) {
  try {
    const newClient = await prisma.Client.create({
      data: req.body,
    });
    res.json(newClient);
  } catch (error) {
    console.log('addClient error:', error);
    if (error.statusCode && error.statusCode >= 400 && error.statusCode < 500) {
      next(error);
    } else {
      next(new Error('Internal server error'));
    }
  }
}

const getClients = async (req, res, next) => {
    try {
      const clients = await prisma.Client.findMany();
      res.status(200).json({
        status: 'success',
        data: clients,
      });
    } catch (error) {
      console.log('addClient error:', error);
      if (error.statusCode && error.statusCode >= 400 && error.statusCode < 500) {
        next(error);
      } else {
        next(new Error('Internal server error'));
      }
    }
  };

  async function updateClient(req, res, next) {
    try {
      const { id } = req.params;
      const updatedClient = await prisma.client.update({
        where: {
          id: parseInt(id),
        },
        data: {
          ...req.body,
        },
      });
      res.status(200).json({
        status: 'success',
        data: updatedClient,
      });
    } catch (error) {
      console.log('addClient error:', error);
      if (error.statusCode && error.statusCode >= 400 && error.statusCode < 500) {
        next(error);
      } else {
        next(new Error('Internal server error'));
      }
    }
  }
  async function deleteClient(req, res, next) {
    const { id } = req.params;

    try {
      const deletedClient = await prisma.client.delete({
        where: {
          id: parseInt(id),
        },
      });

      res.status(200).json({
        status: 'success',
        message: 'Client deleted',
        data: deletedClient,
      });
    } catch (error) {
      console.log('addClient error:', error);
      if (error.statusCode && error.statusCode >= 400 && error.statusCode < 500) {
        next(error);
      } else {
        next(new Error('Internal server error'));
      }
    }
  }

  function errorHandler(err, req, res, next) {
    console.error('Error:', err);
    if (err.status === 400) {
      res.status(400).json({
        message: err.message || 'Invalid Request'
      });
    } else if (err.status === 500) {
      res.status(500).json({
        message: err.message || 'Internal Server Error'
      });
    } else {
      res.status(500).json({
        message: 'Internal Server Error'
      });
    }
  }

module.exports = {addClient,getClients,updateClient,deleteClient,errorHandler};