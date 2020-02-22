<html>

<head>
    <title>First Web Application</title>
</head>

<body>
<a href="homeLogin">Login Page</a>
<font color="red">${errorMessage}</font>
<form method="post" action="/register">
    First Name : <input type="text" name="firstName" />
    Last Name : <input type="text" name="lastName" />
    Username : <input type="text" name="username" />
    Password : <input type="password" name="password" />
    <input type="submit" />
</form>
</body>

</html>