<html>
<b>Version 0.1!!!!</b>
<head>
    <title>First Web Application</title>
</head>

<body>
<a href="homeLogin">Login Page</a>
<font color="red">${errorMessage}</font>
<form method="post" action="/register">
    First Name : <input type="text" name="firstName" required/>
    Last Name : <input type="text" name="lastName" required/>
    Username : <input type="text" name="username" required/>
    Password : <input type="password" name="password" required/>
    <input type="submit" />
</form>
</body>

</html>