<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="2.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

    <xsl:output method="html" encoding="utf-8" indent="no"/>

    <xsl:template match="/request">
        <xsl:text disable-output-escaping="yes">&lt;</xsl:text>!DOCTYPE html<xsl:text
            disable-output-escaping="yes">&gt;</xsl:text>
        <html manifest="manifest.appcache">
            <xsl:choose>
                <xsl:when test="//document[@entity='project' or @entity='demand' or @entity='task' or @entity='request']">
                    <head>
                        <script>
                            <xsl:apply-templates
                                    select="//document[@entity='project' or @entity='demand' or @entity='task' or @entity='request']"/>
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
            <title><xsl:value-of select="//captions/brand/@caption"/></title>
            <link rel="shortcut icon" href="img/favicon.png"/>
            <meta name="format-detection" content="telephone=no"/>
            <meta name="viewport"
                  content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"/>
            <link rel="stylesheet" href="/SharedResources/vendor/bootstrap/css/bootstrap.min.css"/>
            <link rel="stylesheet" href="/SharedResources/vendor/font-awesome/css/font-awesome.min.css"/>
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
                    <img class="brand-logo" alt="logo" src="img/logo.png"/>
                    <span><xsl:value-of select="//captions/loading/@caption"/>...</span>
                </div>
            </app>
            <script src="/SharedResources/ng-app/vendor.js.gz"></script>
            <script src="/SharedResources/ng-app/app.js.gz"></script>
        </body>
    </xsl:template>

    <xsl:template match="document[@entity='project']">
        location.href = location.protocol + '//' + location.host + location.pathname + '#/HelpDesk/projects/<xsl:value-of
            select="@docid"/>';
    </xsl:template>

    <xsl:template match="document[@entity='demand']">
        location.href = location.protocol + '//' + location.host + location.pathname + '#/HelpDesk/demands/<xsl:value-of
            select="@docid"/>';
    </xsl:template>

    <xsl:template match="document[@entity='task']">
        location.href = location.protocol + '//' + location.host + location.pathname + '#/HelpDesk/task/<xsl:value-of
            select="@docid"/>';
    </xsl:template>

    <xsl:template match="document[@entity='request']">
        location.href = location.protocol + '//' + location.host + location.pathname + '#/HelpDesk/requests/<xsl:value-of
            select="@docid"/>';
    </xsl:template>

</xsl:stylesheet>
