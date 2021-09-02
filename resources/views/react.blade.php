<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>Admin</title>

    <!-- Style -->
    <link rel="stylesheet" href="{{mix('/css/app.css')}}">

    <!-- Include Frontend Application (webpack mix) -->
    <script defer src="{{ mix('/js/manifest.js') }}"></script>
    <script defer src="{{ mix('/js/vendor.js') }}"></script>
    <script defer src="{{ mix('/js/app.js') }}"></script>
</head>    

<body>
    <div id="root"></div>
</body>

</html>