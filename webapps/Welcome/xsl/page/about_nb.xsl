<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="2.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

    <xsl:template name="about_nb">
        <!-- about -->
        <section class="section about" id="about_nb">
            <div class="container">
                <div class="features">
                    <div class="feature_box">
                        <div class="feature_box_text">
                            <h1 class="heading">
                                <xsl:value-of select="//captions/about_nb/@caption"/>
                            </h1>
                            <p>
                                <xsl:value-of select="//about_nb"  disable-output-escaping="yes"/>
                            </p>

                        </div>
                        <div class="feature_box_img">
                            <img src="img/about_nb.jpg" alt="About NB"/>
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
