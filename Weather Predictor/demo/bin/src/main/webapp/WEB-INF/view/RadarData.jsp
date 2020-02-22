<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>NEXRAD Data</title>

</head>
<body>
<form method="post" action="getData">
        Year : <input type="text" name="year" /><br/>
        Month : <input type="text" name="month" /> <br/>
        Day : <input type="text" name="day" /><br/>
        Radar Id : <input type="text" name="radarId" /><br/>
        No. of Scans : <input type="text" name="scans" /><br/>
        <input type="submit" value="submit"/>
    </form>
</body>
</html>