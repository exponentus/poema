<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="2.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

    <xsl:template name="learning-center">
        <!-- learning-center -->
        <section class="section learning-center" id="learning-center">
            <div class="container">
                <div class="features">
                    <div class="feature_box">
                        <div class="feature_box_img">
                            <img src="img/learning_center.jpg" alt="Learning center"/>
                        </div>
                        <div class="feature_box_text">
                            <h1 class="heading">
                                <xsl:value-of select="//captions/learning_center/@caption"/>
                            </h1>
                            <p>
                                <xsl:value-of select="//learning_center"  disable-output-escaping="yes"/>
                               <!-- <xsl:choose>
                                    <xsl:when test="//request[@lang = 'RUS']">
                                        <xsl:call-template name="learning_center_content"/>
                                    </xsl:when>
                                    <xsl:when test="//request[@lang = 'KAZ']">
                                        <xsl:call-template name="learning_center_content"/>
                                    </xsl:when>
                                    <xsl:otherwise>
                                        <xsl:call-template name="learning_center_content"/>
                                    </xsl:otherwise>
                                </xsl:choose>-->
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <!-- /learning-center -->
    </xsl:template>

    <xsl:template name="learning_center_content">
        <xsl:value-of select="//captions/learning_center_content/@caption" disable-output-escaping="yes"/>
    </xsl:template>

</xsl:stylesheet>
