const { Prisma } = require('.prisma/client');

const catchPrismaClientError = ( err ) =>
{ 
    if( err instanceof  Prisma.PrismaClientInitializationError )
    {
        message = "Error with the connection to the database.\nPlease Verify The credentials for the database (can be invalid) or verify your connection stability or white a few minute and re excute"
        return message;
    }
    else{
        switch(err.code)
        {
            case 'P1001':
                return("Can't reach database server at {database_host} Please make sure your database server is running at {database_host+}")
            case 'P2000':
                return("The provided value for the column is too long for the column's type. Column: "+err.meta.field_name+"");
            case 'P2002':
                return("Unique constraint failed on the constraint: "+err.meta.field_name+": you try to insert record with an existing value wich supose to be unique")
            case 'P2003':
                return("Foreign key constraint failed on the field:"+err.meta.field_name+",details: you are trying to delete this record wich is referenced by another record linked by field(:"+err.meta.field_name+")")
            case 'P2004':
                return("A constraint failed on the database: "+err.meta.database_error+"")
            case 'P2006':
                return("The provided value: "+err.meta.field_value+" for model: "+err.meta.model_name+"  field : "+err.meta.field_name+"  is not valid")
            case 'P2005':
                return("The value:"+err.meta.field_value+" stored in the database for the field "+err.meta.field_name+" is invalid for the field's type")
            case 'P2025':
                return("you are trying to update or delete a record that does not exist in the database");
            case 'P2015':
                return("inserting or updating a record with a foreign key that does not match an existing primary key in the referenced table.")
            default:
                return("Error while while doing this action due to prisma Exception: ,"+err.message)
        }
    }
};
module.exports = { catchPrismaClientError}
