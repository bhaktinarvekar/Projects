<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@page contentType="text/html;charset=UTF-8" language="java" %>
<%@page isELIgnored="false" %>
<html>
<head>
    <%@ page isELIgnored="false" %>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
</head>
<body>
<form action="/getsession">
    <table>
        <input type ="datetime-local" name="startDate"><br><br>
        <input type = "datetime-local" name="endDate"><br><br>
        <input type ="submit" value="submit"><br>
    </table>
</form>
</body>
</html>