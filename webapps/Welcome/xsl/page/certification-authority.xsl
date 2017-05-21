<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="2.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

    <xsl:template name="certification-authority">
        <!-- cert-authority -->
        <section class="section cert-authority" id="cert-authority">
            <div class="container">
                <div class="features">
                    <div class="feature_box">
                        <div class="feature_box_img right">
                            <img src="img/cert_auth.jpg" alt="Certification authority"/>
                        </div>
                        <div class="feature_box_text">
                            <h1 class="heading">
                                <xsl:value-of select="//captions/cert_authority/@caption"/>
                            </h1>
                            <p>
                                <xsl:value-of select="//cert_authority"  disable-output-escaping="yes"/>
                                <!--<xsl:choose>
                                    <xsl:when test="//request[@lang = 'RUS']">
                                        <xsl:call-template name="certification_authority_content"/>
                                    </xsl:when>
                                    <xsl:when test="//request[@lang = 'KAZ']">
                                        <xsl:call-template name="certification_authority_content"/>
                                    </xsl:when>
                                    <xsl:otherwise>
                                        <xsl:call-template name="certification_authority_content"/>
                                    </xsl:otherwise>
                                </xsl:choose>-->
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <!-- /cert-authority -->
    </xsl:template>

    <xsl:template name="certification_authority_content">
        <xsl:value-of select="//captions/cert_authority_content/@caption" disable-output-escaping="yes"/>
    </xsl:template>

</xsl:stylesheet>
