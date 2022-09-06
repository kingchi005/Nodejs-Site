let user = `{
  "id": "100",
  "Email": "admin@this.web",
  "FirstName": "KingDavid",
  "LastName": "Chibueze",
  "Phone": "8107721911",
  "Password": "$2y$10$UnxWrNtLcoQhv1JIo9Gz4.ByN1cNqYF/QmgERHN7R7x37gWU1EL5i"
}`



let proto = fs.readFileSync('C:/Users/king/Downloads/users.json');
let readData = JSON.parse(user);

log(JSON.stringify(readData, null, 2))