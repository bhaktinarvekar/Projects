<html>

<head>
    <title>First Web Application</title>
</head>

<body>
<a href="home">Create an Account</a>
<span style="color: red; ">${errorMessage}</span>
<form method="post" action="/login">
    Username : <input type="text" name="username" required/>
    Password : <input type="password" name="password" required/>
    <input type="submit" />
</form>
</body>

</html>