<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@page contentType="text/html;charset=UTF-8" language="java" %>
<%@page isELIgnored="false" %>
<html>
<head>
    <%@ page isELIgnored="false" %>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title>Get History</title>
    <p>
        <a href="/homeLogout">Logout</a> |
        <a href="/searchData">Search Radar Data</a> |
    </p>
</head>
<body>
Session Management
<form action="getsession" method="post">
    <table>
        <b>Start Date</b> <input type ="datetime-local" name="startDate" required><br><br>
        <b>End Date</b> <input type = "datetime-local" name="endDate" required><br><br>
        <input type ="submit" value="submit"><br>
    </table>
</form>
</body>
</html>