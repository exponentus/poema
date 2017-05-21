<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="2.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

    <xsl:template name="about">
        <!-- about -->
        <section class="section about" id="about">
            <div class="container">
                <div class="features">
                    <div class="feature_box">
                        <div class="feature_box_img">
                            <img src="img/about_us.jpg" alt="Certification authority"/>
                        </div>
                        <div class="feature_box_text">
                            <h1 class="heading">
                                <xsl:value-of select="//captions/about_us/@caption"/>
                            </h1>
                            <p>
                               <!-- <xsl:call-template name="about_content"/>-->
                                <xsl:value-of select="//about_us"  disable-output-escaping="yes"/>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <!-- /about -->
    </xsl:template>

    <xsl:template name="about_content">
        <xsl:value-of select="//captions/about_us_text/@caption" disable-output-escaping="yes"/>
    </xsl:template>

</xsl:stylesheet>
