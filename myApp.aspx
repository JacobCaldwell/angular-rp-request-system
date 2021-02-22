<!DOCTYPE html>
<%@ Page language="C#" %>
    <%@ Register Tagprefix="SharePoint"
     Namespace="Microsoft.SharePoint.WebControls"
     Assembly="Microsoft.SharePoint, Version=14.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
        <%@ Import Namespace="Microsoft.SharePoint" %>



            <html xmlns:mso="urn:schemas-microsoft-com:office:office" xmlns:msdt="uuid:C2F41010-65B3-11d1-A29F-00AA00C14882" ng-app="testApp">

            <head>
                    <title>Prototyping Request Portal</title>
                <meta charset="utf-8">
                <meta name="viewport" content="width=device-width, initial-scale=1">
                <!-- <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" type="text/css"> -->
                <!-- <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css" integrity="sha384-WskhaSGFgHYWDcbwN70/dfYBj47jz9qbsMId/iRN3ewGhXQFZCSftd1LZCfmhktB" crossorigin="anonymous"> -->
                
                <!-- <base href="/"> -->
                
                <link rel="stylesheet" href="assets/bootstrap/css/bootstrap.min.css">
                
                <!-- <link rel="stylesheet" href="css/stylesheet.css" type="text/css"> -->
                <link rel="stylesheet" type="text/css" href="https://abb.sharepoint.com/sites/EPIP-GlobalEngineeringSystems/SiteAssets/icons/style.css">
                
            </head>

            <body>

                <form runat="server">
                    <SharePoint:FormDigest ID="FormDigest1" runat="server"></SharePoint:FormDigest>
                </form>

                <nav class="navbar navbar-expand-md navbar-dark bg-dark d-print-none">
                    <div class="container-fluid">
                        <a class="navbar-brand" href="#"><i class="fa fa-fw icon-codepen mx-1"></i>Prototyping Requests Portal</a>
                        <button class="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"> <span class="navbar-toggler-icon"></span> </button>
                        <div class="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul class="navbar-nav mr-auto">
                                <li class="nav-item">
                                    <a class="nav-link" href="Prototyping.aspx">Prototyping</a>
                                </li>
                            </ul>
                            <a class="btn btn-default navbar-btn btn-success text-light px-5 style" href="#form" id="new-request-btn">Submit New Request</a>

                        </div>
                    </div>
                </nav>

                <div class="py-2 d-print-none">
                    <div class="container-fluid">
                        <div class="row">
                            <div class="col-md-12">

                                <ul class="nav nav-tabs">
                                    <li class="nav-item active" id="nav-requests">
                                        <a class="nav-link nav-header-item" href="#current" routerLinkActive="active"><i class="fa icon-cubes"></i>Latest Requests</a>
                                    </li>
                                    <li class="nav-item" id="nav-queue">
                                        <a class="nav-link nav-header-item" href="#queue" routerLinkActive="active"><i class="fa fa-fw icon-stack"></i>Current Queue</a>
                                    </li>
                                    <li class="nav-item" id="nav-history">
                                        <a class="nav-link nav-header-item" href="#history" routerLinkActive="active"><i class="fa fa-fw icon-database"></i>Your Past Requests</a>
                                    </li>
                                    <li class="nav-item" id="nav-admin">
                                        <a class="nav-link nav-header-item" href="#admin" routerLinkActive="active"><i class="fa fa-fw icon-shield"></i>Administration</a>
                                    </li>
                                </ul>

                            </div>
                        </div>
                    </div>
                </div>


                <phone-list></phone-list>

                <div ng-controller="mainController">

                        <phone-list></phone-list>

                    <div class="py-5" id="current-request">
                        <ng-view></ng-view>
                    </div>
                </div>





                <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js " integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo " crossorigin="anonymous "></script>
                <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js " integrity="sha384-ZMP7rVo3mIykV+2+9J3UJ46jBk0WLaUAdn689aCwoqbBJiSnjAK/l8WvCWPIPm49 " crossorigin="anonymous "></script>
                <!-- <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.1/js/bootstrap.min.js " integrity="sha384-smHYKdLADwkXOn1EmN1qk/HfnUcbVRZyYmZ4qpPea6sjB/pTJ0euyQp0Mk8ck+5T " crossorigin="anonymous "></script> -->
                <script src="assets/bootstrap/js/bootstrap.min.js"></script>
                
                
                <!-- load angular via CDN -->
                <script src="https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.6.5/angular.min.js "></script>
                <script src="https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.6.5/angular-resource.min.js "></script>
                <script src="https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.6.5/angular-route.min.js "></script>
                <script src="https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.6.5/angular-messages.min.js "></script>
                <script src="app.js"></script>
                <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.7.2/Chart.js"></script>
                <script src="assets/chart/js/angular-chart.min.js" ></script>
                
                <!--                <script type="text/javascript" src="js/javascript-prototyping.js"></script>-->
            </body>

            </html>
