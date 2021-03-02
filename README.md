# TO USE THIS APP THE FOLLOWING SOFTWARES SHOULD BE INSTALLED ON YOUR COMPUTER

    1. Node
    2. Postgres
    3. Postgis

## SYSTEM SETUP DIRECTIONS

    1. Import database 'swms' into your postgres server

        i. open cmd and navigate to folder swms.

        ii. run the command the following command to add the database swms to your local postgres DBMS.
            >> cmd command: 'psql -U postgres -f swms.sql'
        iii. All cmd commands are run without the quotations!!!
    3. Go to folder 'config' in swms and open the file 'dbcon.ini' using any text editor.
    4. Change the values for User & Password to match your Postgres DBMS credentials and save.

## RUNNING THE SYSTEM

    1. Start Node server.
    2. Open Chrome Web Browser or any browser you have.
    3. Type in the following URL into your browser 'http://localhost:3000'
    4. The Credintials for login are

        ->Username : superadmin  |  Password : superadmin
        ->Username : supervisor  |  Password : 12345