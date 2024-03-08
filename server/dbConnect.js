/* The connection string below (is called a connection string)
    is what connects my Node.js server to my SQL Server database
    server=ON44C03431532\\MSSQLSERVER01 (name of SQL Server to connect to)
    Trusted_Connection=Yes (windows credentials of current user used for authentication)
    module.exports=connectionString; (this allows other .js files in my project to 
        import this connection string to connect to the same SQL Server database)
        This is technically our API
    */

    const connectionString="server=ON44C03431532\\MSSQLSERVER01;Database=pubs;Trusted_Connection=Yes;Driver={SQL Server Native Client 11.0}";
    module.exports=connectionString;

    