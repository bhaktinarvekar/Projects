<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
        <link rel="stylesheet" href="http://code.jquery.com/ui/1.9.1/themes/base/jquery-ui.css" />
        <script src="http://code.jquery.com/jquery-1.8.2.js"></script>
        <script src="http://code.jquery.com/ui/1.9.1/jquery-ui.js"></script>
		<meta charset="UTF-8">
		<title>NEXRAD Data Result</title>
        <p>
                <a href="/homeLogout">Logout</a> |
                <a href="/session">View History</a> |
                <a href="/searchData">Search Radar Data</a> |
        </p>

</head>

<body>
<div id="preview">
    <img id="imagePreview" src="${getPlots}"alt="Profile Photo"/>
</div>
</body>
</html>