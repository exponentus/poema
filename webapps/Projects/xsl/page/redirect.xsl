<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="2.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

    <xsl:output method="html" encoding="utf-8" indent="no"/>

    <xsl:template match="/request">
        <xsl:text disable-output-escaping="yes">&lt;</xsl:text>!DOCTYPE html<xsl:text
            disable-output-escaping="yes">&gt;</xsl:text>
        <html>
            <head>
                <script>
                    <xsl:apply-templates select="//redirect"/>
                </script>
            </head>
        </html>
    </xsl:template>

    <xsl:template match="redirect">
        location.href = '<xsl:value-of select="."/>';
    </xsl:template>

</xsl:stylesheet>
