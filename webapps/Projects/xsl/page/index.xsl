<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="2.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

    <xsl:output method="html" encoding="utf-8" indent="no"/>

    <xsl:template match="/request">
        <xsl:text disable-output-escaping="yes">&lt;</xsl:text>!DOCTYPE html<xsl:text
            disable-output-escaping="yes">&gt;</xsl:text>
        <html>
            <xsl:choose>
                <xsl:when test="//document[@entity='project' or @entity='task' or @entity='request']">
                    <head>
                        <script>
                            <xsl:apply-templates
                                    select="//document[@entity='project' or @entity='task' or @entity='request']"/>
                        </script>
                    </head>
                </xsl:when>
                <xsl:otherwise>
                    <xsl:call-template name="layout"/>
                </xsl:otherwise>
            </xsl:choose>
        </html>
    </xsl:template>

    <xsl:template name="layout">
        <head>
            <base href=""/>
            <meta charset="utf-8"/>
            <title></title>
            <link rel="shortcut icon" href="img/favicon.png"/>
            <meta name="format-detection" content="telephone=no"/>
            <meta name="viewport"
                  content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"/>
            <link rel="stylesheet" href="/SharedResources/vendor/bootstrap/css/bootstrap.min.css"/>
            <link rel="stylesheet" href="/SharedResources/vendor/font-awesome/css/font-awesome.min.css"/>
            <!--<link rel="stylesheet" href="/SharedResources/nb/css/nb.min.css"/>-->
            <link rel="stylesheet" href="css/all.min.css"/>
            <style>
                <![CDATA[
                /* fix: fieldset content overflow */
                fieldset {
                    display: block;
                    min-width: inherit; /* chrome */
                }
                @-moz-document url-prefix() {
                    fieldset {
                        display: table-column !important;
                    }
                }
                ]]>
            </style>
        </head>
        <body>
            <app class="body">
                <div class="app-loading">
                    <img class="brand-logo" alt="logo" src="img/logo.png"/>Loading...
                </div>
            </app>
            <script src="js/vendor.js.gz"></script>
            <script src="js/app.js.gz"></script>
        </body>
    </xsl:template>

    <xsl:template match="document[@entity='project']">
        location.href = location.protocol + '//' + location.host + location.pathname + '#/projects/<xsl:value-of
            select="@docid"/>';
    </xsl:template>

    <xsl:template match="document[@entity='task']">
        location.href = location.protocol + '//' + location.host + location.pathname + '#/task/<xsl:value-of
            select="@docid"/>';
    </xsl:template>

    <xsl:template match="document[@entity='request']">
        location.href = location.protocol + '//' + location.host + location.pathname + '#/requests/<xsl:value-of
            select="@docid"/>';
    </xsl:template>

</xsl:stylesheet>
