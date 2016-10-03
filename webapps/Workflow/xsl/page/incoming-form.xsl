<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet version="2.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    <xsl:import href="../layout.xsl"/>
    <xsl:import href="../templates/sharedfields.xsl"/>

    <xsl:template match="/request">
        <xsl:call-template name="layout"/>
    </xsl:template>

    <xsl:template name="_content">
        <xsl:apply-templates select="//document[@entity = 'incoming']"/>
    </xsl:template>

    <xsl:template match="document[@entity]">
        <form class="form" name="{@entity}" action="" data-edit="{@editable}">
            <header class="content-header">
                <h1 class="header-title">
                    <xsl:value-of select="//captions/incoming/@caption"/>
                </h1>
                <div class="content-actions">
                    <xsl:apply-templates select="//actionbar"/>
                </div>
            </header>
            <section class="content-body">
                <ul class="nav nav-tabs" role="tablist">
                    <li class="active">
                        <a href="#tabs-1" role="tab" data-toggle="tab">
                            <xsl:value-of select="//captions/properties/@caption"/>
                        </a>
                    </li>
                    <li>
                        <a href="#tabs-att" role="tab" data-toggle="tab">
                            <xsl:value-of select="//captions/reg_documents/@caption"/>
                        </a>
                    </li>
                    <li>
                        <a href="#tabs-docinfo" role="tab" data-toggle="tab">
                            <xsl:value-of select="//captions/additional/@caption"/>
                        </a>
                    </li>
                </ul>
                <div class="tab-content">
                    <div role="tabpanel" class="tab-pane active" id="tabs-1">
                        <div class="fieldset">
                            <div class="form-group">
                                <div class="control-label">
                                    <xsl:value-of select="//captions/applied_reg_date/@caption"/>
                                </div>
                                <div class="controls">
                                    <input type="date" name="appliedRegDate" value="{fields/appliedregdate}"
                                           class="span2"/>
                                </div>
                            </div>
                            <div class="form-group">
                                <div class="control-label">
                                    <xsl:value-of select="//captions/doc_language/@caption"/>
                                </div>
                                <div class="controls">
                                    <select name="docLanguage" class="span8">
                                        <xsl:apply-templates select="fields/doclanguage" mode="selected_options"/>
                                    </select>
                                </div>
                            </div>
                            <div class="form-group">
                                <div class="control-label">
                                    <xsl:value-of select="//captions/doc_type/@caption"/>
                                </div>
                                <div class="controls">
                                    <select name="docType" class="span8">
                                        <xsl:apply-templates select="fields/doctype" mode="selected_options"/>
                                    </select>
                                </div>
                            </div>
                            <div class="form-group">
                                <div class="control-label">
                                    <xsl:value-of select="//captions/sender/@caption"/>
                                </div>
                                <div class="controls">
                                    <select name="sender" class="span8">
                                        <xsl:apply-templates select="fields/sender" mode="selected_options"/>
                                    </select>
                                </div>
                            </div>
                            <div class="form-group">
                                <div class="control-label">
                                    <xsl:value-of select="//captions/sender_applied_reg_date/@caption"/>
                                </div>
                                <div class="controls">
                                    <input type="date" name="senderAppliedRegDate" value="{fields/senderappliedregdate}"
                                           class="span2"/>
                                </div>
                            </div>
                            <div class="form-group">
                                <div class="control-label">
                                    <xsl:value-of select="//captions/summary/@caption"/>
                                </div>
                                <div class="controls">
                                    <textarea type="text" name="summary" value="{fields/summary}" class="span8">
                                        <xsl:value-of select="fields/summary"/>
                                    </textarea>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div role="tabpanel" class="tab-pane" id="tabs-att">
                        <fieldset class="fieldset">
                            <xsl:call-template name="upload-files">
                                <xsl:with-param name="input-name" select="'reg-files'"/>
                            </xsl:call-template>
                        </fieldset>
                    </div>
                    <div role="tabpanel" class="tab-pane" id="tabs-docinfo">
                        <xsl:call-template name="docinfo"/>
                    </div>
                </div>
            </section>
            <input type="hidden" name="fsid" value="{//formsesid}"/>
        </form>
    </xsl:template>

</xsl:stylesheet>
