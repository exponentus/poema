<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="2.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

    <xsl:import href="../layout.xsl"/>
    <xsl:import href="../templates/header.xsl"/>
    <xsl:import href="../templates/footer.xsl"/>
    <xsl:import href="about.xsl"/>
    <xsl:import href="about_nb.xsl"/>
    <xsl:import href="contact.xsl"/>
    <xsl:import href="certification-authority.xsl"/>
    <xsl:import href="learning-center.xsl"/>

    <xsl:template match="/request">
        <xsl:call-template name="layout"/>
    </xsl:template>

    <xsl:template name="_content">
        <xsl:call-template name="header"/>
        <xsl:call-template name="about_nb"/>
        <xsl:call-template name="learning-center"/>
        <xsl:call-template name="certification-authority"/>
        <xsl:call-template name="about"/>
        <xsl:call-template name="contact"/>
        <xsl:call-template name="footer"/>
    </xsl:template>

</xsl:stylesheet>
