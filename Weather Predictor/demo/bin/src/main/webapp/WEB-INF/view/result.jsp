<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ page contentType="text/html; charset=UTF-8" isELIgnored="false"%>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    ${USERNAME} activities from ${startDate} to ${endDate}
</head>
<body><br>
<font color="red">${errormessage}</font>
    <table border="1 px">
        <tr>
            <th>Radar ID</th>
            <th>Day</th>
            <th>Month</th>
            <th>Year</th>
            <th>Data Entered</th>
            <th>Data Plotted</th>
            <th>Data Retrieved</th>
        </tr>
        <c:forEach items ="${jsonArray}" var="userData">

            <tr>
                <td>${userData.radar}</td>
                <td>${userData.day}</td>
                <td>${userData.month}</td>
                <td>${userData.year}</td>
                <td>${userData.inserttime}</td>
                <td>${userData.plottime}</td>
                <td>${userData.retrievetime}</td>
            </tr>
        </c:forEach>
    </table>
</body>
</html>