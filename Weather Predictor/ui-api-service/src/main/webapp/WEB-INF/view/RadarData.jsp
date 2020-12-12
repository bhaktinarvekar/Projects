<%--<%@ page language="java" contentType="text/html; charset=UTF-8"--%>
<%--    pageEncoding="UTF-8"%>--%>
<%--<!DOCTYPE html>--%>
<%--<html>--%>
<%--<head>--%>
<%--<meta charset="UTF-8">--%>
<%--<title>NEXRAD Data</title>--%>

<%--</head>--%>
<%--<body>--%>
<%--<form method="post" action="getData">--%>
<%--        Year : <input type="text" name="year" /><br/>--%>
<%--        Month : <input type="text" name="month" /> <br/>--%>
<%--        Day : <input type="text" name="day" /><br/>--%>
<%--        Radar Id : <input type="text" name="radarId" /><br/>--%>
<%--        No. of Scans : <input type="text" name="scans" /><br/>--%>
<%--        <input type="submit" value="submit"/>--%>
<%--    </form>--%>
<%--</body>--%>
<%--</html>--%>


<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
        <link rel="stylesheet" href="http://code.jquery.com/ui/1.9.1/themes/base/jquery-ui.css" />
        <script src="http://code.jquery.com/jquery-1.8.2.js"></script>
        <script src="http://code.jquery.com/ui/1.9.1/jquery-ui.js"></script>
        <meta charset="UTF-8">
        <title>NEXRAD Data</title>
        <p>
                <a href="/homeLogout">Logout</a> |
                <a href="/session">View History</a> |
                <a href="/getPlots">View Results</a> |
        </p>

</head>
<body>

<!-- <form method="post" action="searchData"> -->
<!--         Year : <input type="text" name="year" /><br/> -->
<!--         Month : <input type="text" name="month" /> <br/> -->
<!--         Day : <input type="text" name="day" /><br/> -->
<!--         Radar Id : <input type="text" name="radarId" /><br/> -->
<!--         No. of Scans : <input type="text" name="scans" /><br/> -->
<!--         <input type="submit" value="submit"/> -->
<!--     </form> -->

<form action="getData" method="post">
        <table style="with: 50%">
<%--                <tr>--%>
<%--                        <td>Year</td>--%>
<%--                        <td><input type="text" name="year" /></td>--%>
<%--                </tr>--%>
<%--                <tr>--%>
<%--                        <td>Month</td>--%>
<%--                        <td><input type="text" name="month" /></td>--%>
<%--                </tr>--%>
<%--                <tr>--%>
<%--                        <td>Day</td>--%>
<%--                        <td><input type="text" name="day" /></td>--%>
<%--                </tr>--%>
                <tr>
                        <td>Date</td>
                        <td><input type="text" id="datepicker" name="date" required></td>
                </tr>
                <tr>
                        <td>Radar Id</td>
                        <td>
                                <select name="radarId" required>
                                        <option value="KABR">Aberdeen, SD</option>
                                        <option value="KENX">Albany, NY</option>
                                        <option value="KABX">Albuquerque, NM</option>
                                        <option value="KFDR">Altus AFB, OK</option>
                                        <option value="KAMA">Amarillo, TX</option>
                                        <option value="PAHG">Anchorage, AK</option>
                                        <option value="PGUA">Anderson AFB, GU</option>
                                        <option value="KFFC">Atlanta, GA</option>
                                        <option value="KEWX">Austin/San Antonio, TX</option>
                                        <option value="KBBX">Beale AFB, CA</option>
                                        <option value="PABC">Bethel, AK</option>
                                        <option value="KBLX">Billings, MT</option>
                                        <option value="KBGM">Binghamton, NY</option>
                                        <option value="KBMX">Birmingham, AL</option>
                                        <option value="KBIS">Bismarck, ND</option>
                                        <option value="KCBX">Boise, ID</option>
                                        <option value="KBOX">Boston, MA</option>
                                        <option value="KBRO">Brownsville, TX</option>
                                        <option value="KBUF">Buffalo, NY</option>
                                        <option value="KCXX">Burlington, VT</option>
                                        <option value="RKSG">Camp Humphreys, Korea</option>
                                        <option value="KFDX">Cannon AFB, NM</option>
                                        <option value="KICX">Cedar City, UT</option>
                                        <option value="KCLX">Charleston, SC</option>
                                        <option value="KRLX">Charleston, WV</option>
                                        <option value="KCYS">Cheyenne, WY</option>
                                        <option value="KLOT">Chicago, IL</option>
                                        <option value="KILN">Cincinnati, OH</option>
                                        <option value="KCLE">Cleveland, OH</option>
                                        <option value="KCAE">Columbia, SC</option>
                                        <option value="KGWX">Columbus AFB, MS</option>
                                        <option value="KCRP">Corpus Christi, TX</option>
                                        <option value="KFWS">Dallas/Ft. Worth, TX</option>
                                        <option value="KDVN">Davenport, IA</option>
                                        <option value="KFTG">Denver, CO</option>
                                        <option value="KDMX">Des Moines, IA</option>
                                        <option value="KDTX">Detroit, MI</option>
                                        <option value="KDDC">Dodge City, KS</option>
                                        <option value="KDOX">Dover AFB, DE</option>
                                        <option value="KDLH">Duluth, MN</option>
                                        <option value="KDYX">Dyess AFB, TX</option>
                                        <option value="KEYX">Edwards AFB, CA</option>
                                        <option value="KEVX">Eglin AFB, FL</option>
                                        <option value="KEPZ">El Paso, TX</option>
                                        <option value="KLRX">Elko, NV</option>
                                        <option value="KBHX">Eureka, CA</option>
                                        <option value="PAPD">Fairbanks, AK</option>
                                        <option value="KFSX">Flagstaff, AZ</option>
                                        <option value="KHPX">Fort Campbell, KY</option>
                                        <option value="KGRK">Fort Hood, TX</option>
                                        <option value="KPOE">Fort Polk, LA</option>
                                        <option value="KEOX">Fort Rucker, AL</option>
                                        <option value="KSRX">Fort Smith, AR</option>
                                        <option value="KIWX">Fort Wayne, IN</option>
                                        <option value="KAPX">Gaylord, MI</option>
                                        <option value="KGGW">Glasgow, MT</option>
                                        <option value="KGLD">Goodland, KS</option>
                                        <option value="KMVX">Grand Forks, ND</option>
                                        <option value="KGJX">Grand Junction, Co</option>
                                        <option value="KGRR">Grand Rapids, MI</option>
                                        <option value="KTFX">Great Falls, MT</option>
                                        <option value="KGRB">Green Bay, WI</option>
                                        <option value="KGSP">Greer, SC</option>
                                        <option value="KRMX">Griffiss AFB, NY</option>
                                        <option value="KUEX">Hastings, NE</option>
                                        <option value="KHDX">Holloman AFB, NM</option>
                                        <option value="KCBW">Houlton, ME</option>
                                        <option value="KHGX">Houston/Galveston, TX</option>
                                        <option value="KHTX">Huntsville, AL</option>
                                        <option value="KIND">Indianapolis, IN</option>
                                        <option value="KJKL">Jackson, KY</option>
                                        <option value="KJAN">Jackson, MS</option>
                                        <option value="KJAX">Jacksonville, FL</option>
                                        <option value="RODN">Kadena, Okinawa</option>
                                        <option value="PHKN">Kamuela, HI</option>
                                        <option value="KEAX">Kansas City, MO</option>
                                        <option value="KBYX">Key West, FL</option>
                                        <option value="PAKC">King Salmon, AK</option>
                                        <option value="KMRX">Knoxville/Tri-Cities, TN</option>
                                        <option value="RKJK">Kunsan AB, Korea</option>
                                        <option value="KARX">La Crosse, WI</option>
                                        <option value="LPLA">Lajes AB, Azores</option>
                                        <option value="KLCH">Lake Charles, LA</option>
                                        <option value="KESX">Las Vegas, NV</option>
                                        <option value="KDFX">Laughlin AFB, TX</option>
                                        <option value="KILX">Lincoln, IL</option>
                                        <option value="KLZK">Little Rock, AR</option>
                                        <option value="KVTX">Los Angeles, CA</option>
                                        <option value="KLVX">Louisville, KY</option>
                                        <option value="KLBB">Lubbock, TX</option>
                                        <option value="KMQT">Marquette, MI</option>
                                        <option value="KMXX">Maxwell AFB, AL</option>
                                        <option value="KMAX">Medford, OR</option>
                                        <option value="KMLB">Melbourne, FL</option>
                                        <option value="KNQA">Memphis, TN</option>
                                        <option value="KAMX">Miami, FL</option>
                                        <option value="PAIH">Middleton Island, AK</option>
                                        <option value="KMAF">Midland/Odessa, TX</option>
                                        <option value="KMKX">Milwaukee, WI</option>
                                        <option value="KMPX">Minneapolis/St. Paul, MN</option>
                                        <option value="KMBX">Minot AFB, ND</option>
                                        <option value="KMSX">Missoula, MT</option>
                                        <option value="KMOB">Mobile, AL</option>
                                        <option value="PHMO">Molokai, HI</option>
                                        <option value="KVAX">Moody AFB, GA</option>
                                        <option value="KMHX">Morehead City, NC</option>
                                        <option value="KOHX">Nashville, TN</option>
                                        <option value="KLIX">New Orleans, LA</option>
                                        <option value="KOKX">New York City, NY</option>
                                        <option value="PAEC">Nome, AK</option>
                                        <option value="KAKQ">Norfolk/Richmond, VA</option>
                                        <option value="KLNX">North Platte, NE</option>
                                        <option value="KTLX">Oklahoma City, OK</option>
                                        <option value="KOAX">Omaha, NE</option>
                                        <option value="KPAH">Paducah, KY</option>
                                        <option value="KPDT">Pendleton, OR</option>
                                        <option value="KDIX">Philadelphia, PA</option>
                                        <option value="KIWA">Phoenix, AZ</option>
                                        <option value="KPBZ">Pittsburgh, PA</option>
                                        <option value="KSFX">Pocatello/Idaho Falls, ID</option>
                                        <option value="KGYX">Portland, ME</option>
                                        <option value="KRTX">Portland, OR</option>
                                        <option value="KPUX">Pueblo, CO</option>
                                        <option value="KRAX">Raleigh/Durham, NC</option>
                                        <option value="KUDX">Rapid City, SD</option>
                                        <option value="KRGX">Reno, NV</option>
                                        <option value="KRIW">Riverton, WY</option>
                                        <option value="KFCX">Roanoke, VA</option>
                                        <option value="KJGX">Robins AFB, GA</option>
                                        <option value="KDAX">Sacramento, CA</option>
                                        <option value="KLSX">Saint Louis, MO</option>
                                        <option value="KMTX">Salt Lake City, UT</option>
                                        <option value="KSJT">San Angelo, TX</option>
                                        <option value="KNKX">San Diego, CA</option>
                                        <option value="KMUX">San Francisco, CA</option>
                                        <option value="KHNX">San Joaquin Valley, CA</option>
                                        <option value="TJUA">San Juan, PR</option>
                                        <option value="KSOX">Santa Ana Mountains, CA</option>
                                        <option value="KATX">Seattle/Tacoma, WA</option>
                                        <option value="KSHV">Shreveport, LA</option>
                                        <option value="KFSD">Sioux Falls, SD</option>
                                        <option value="ACG">Sitka, AK</option>
                                        <option value="PHKI">South Kauai, HI</option>
                                        <option value="PHWA">South Shore, HI</option>
                                        <option value="KOTX">Spokane, WA</option>
                                        <option value="KSGF">Springfield, MO</option>
                                        <option value="KCCX">State College, PA</option>
                                        <option value="KLWX">Sterling, VA</option>
                                        <option value="KTLH">Tallahassee, FL</option>
                                        <option value="KTBW">Tampa, FL</option>
                                        <option value="KTWX">Topeka, KS</option>
                                        <option value="KEMX">Tucson, AZ</option>
                                        <option value="KINX">Tulsa, OK</option>
                                        <option value="KVNX">Vance AFB, OK</option>
                                        <option value="KVBX">Vandenberg AFB, CA</option>
                                        <option value="KICT">Wichita, KS</option>
                                        <option value="KLTX">Wilmington, NC</option>
                                        <option value="KYUX">Yuma, AZ</option>
                                        <!--     					<option value="rada">name</option> -->
                                        <!--     					<option value="category_id">name</option> -->
                                </select>
                        </td>
                </tr>
                <tr>
                        <td>No. of Scans you want to see</td>
                        <td><input type="text" name="scans" required/></td>
                </tr>
        </table>
        <input type="submit" value="submit" /></form>
<font color="red">${status}</font>
</body>
<script type="text/javascript">
        $(function() {
                var date = new Date();
                var currentMonth = date.getMonth();
                var currentDate = date.getDate();
                var currentYear = date.getFullYear();
                $('#datepicker').datepicker({
                        maxDate: new Date(currentYear, currentMonth, currentDate),
                        minDate: new Date(1991,12,01)
                });
        });
</script>
</html>