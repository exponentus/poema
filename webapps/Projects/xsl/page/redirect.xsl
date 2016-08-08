<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="2.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

    <xsl:output method="html" encoding="utf-8" indent="no"/>

    <xsl:template match="/request">
        <xsl:text disable-output-escaping="yes">&lt;</xsl:text>!DOCTYPE html<xsl:text
            disable-output-escaping="yes">&gt;</xsl:text>
        <html>
            <head>
                <script>
                    <xsl:apply-templates select="//document[@entity='task' or @entity='project']"/>
                </script>
            </head>
        </html>
    </xsl:template>

    <xsl:template match="document[@entity='task']">
        location.href = location.protocol + '//' + location.host + location.pathname + '#/task/<xsl:value-of
            select="@docid"/>';
    </xsl:template>

    <xsl:template match="document[@entity='project']">
        location.href = location.protocol + '//' + location.host + location.pathname + '#/projects/<xsl:value-of
            select="@docid"/>';
    </xsl:template>

</xsl:stylesheet>
