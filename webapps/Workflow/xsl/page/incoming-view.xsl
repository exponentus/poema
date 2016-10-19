<?xml version="1.0" ?>
<xsl:stylesheet version="2.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    <xsl:import href="../layout.xsl"/>

    <xsl:template match="/request">
        <xsl:call-template name="layout"/>
    </xsl:template>

    <xsl:template name="_content">
        <div class="content-header">
            <xsl:call-template name="page-info">
                <xsl:with-param name="title" select="//captions/incoming_documents/@caption"/>
            </xsl:call-template>
        </div>
        <div class="content-body">
            <div class="view">
                <xsl:call-template name="view-table"/>
            </div>
        </div>
    </xsl:template>

    <xsl:template name="view-table">
        <header class="entries-head">
            <div class="head-wrap">
                <label class="entry-select">
                    <input type="checkbox" data-toggle="docid" class="all"/>
                </label>
                <div class="entry-captions">
                    <div class="vw-reg-number">
                        <xsl:value-of select="//captions/reg_number/@caption"/>
                    </div>
                    <div class="vw-reg-date">
                        <xsl:value-of select="//captions/applied_reg_date/@caption"/>
                    </div>
                    <div class="vw-doc-language">
                        <xsl:value-of select="//captions/doc_language/@caption"/>
                    </div>
                    <div class="vw-doc-type">
                        <xsl:value-of select="//captions/doc_type/@caption"/>
                    </div>
                    <div class="vw-sender">
                        <xsl:value-of select="//captions/sender/@caption"/>
                    </div>
                    <div class="vw-reg-date">
                        <xsl:value-of select="//captions/sender_applied_reg_date/@caption"/>
                    </div>
                    <div class="vw-content">
                        <xsl:value-of select="//captions/content/@caption"/>
                    </div>
                </div>
            </div>
        </header>
        <div class="entries">
            <xsl:apply-templates select="//view_content//query/entry" mode="view-table-body"/>
        </div>
    </xsl:template>

    <xsl:template match="entry" mode="view-table-body">
        <div class="entry-wrap">
            <div data-id="{@id}" class="entry">
                <label class="entry-select">
                    <input type="checkbox" name="docid" value="{@id}"/>
                </label>
                <a href="{@url}" class="entry-link">
                    <div class="entry-fields">
                        <div class="vw-reg-number">
                            <xsl:value-of select="viewcontent/regnumber"/>
                        </div>
                        <div class="vw-reg-date">
                            <xsl:value-of select="viewcontent/appliedregdate"/>
                        </div>
                        <div class="vw-doc-language">
                            <xsl:value-of select="viewcontent/doclanguage"/>
                        </div>
                        <div class="vw-doc-type">
                            <xsl:value-of select="viewcontent/doctype"/>
                        </div>
                        <div class="vw-sender">
                            <xsl:value-of select="viewcontent/sender"/>
                        </div>
                        <div class="vw-reg-date">
                            <xsl:value-of select="viewcontent/senderappliedregdate"/>
                        </div>
                        <div class="vw-content">
                            <xsl:value-of select="viewcontent/title"/>
                        </div>
                    </div>
                </a>
            </div>
        </div>
    </xsl:template>

</xsl:stylesheet>
