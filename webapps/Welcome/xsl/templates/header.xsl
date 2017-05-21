<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="2.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

    <xsl:template name="header">
        <header>
            <xsl:call-template name="navbar"/>
            <xsl:call-template name="promo"/>
        </header>
    </xsl:template>

    <xsl:template name="navbar">
        <nav class="navbar navbar-fixed-top navbar-default js-navbar-top js-toggle-class">
            <div class="container">
                <div class="navbar-header">
                    <button type="button" class="navbar-toggle collapsed"
                            data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                        <span class="sr-only">Toggle navigation</span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                    </button>
                    <a class="navbar-brand" href="#home">
                        <img style="margin-top:0px; height:35px" src="img/logo_NB.png"/>
                    </a>
                </div>
                <div id="navbar" class="collapse navbar-collapse" aria-expanded="false">
                    <ul class="nav navbar-nav navbar-right">
                        <li class="active">
                            <a href="#home">
                                <xsl:value-of select="//captions/home/@caption"/>
                            </a>
                        </li>
                        <li class="">
                            <a href="#about_nb">
                                <xsl:value-of select="//captions/about_nb/@caption"/>
                            </a>
                        </li>
                        <li class="">
                            <a href="#learning-center">
                                <xsl:value-of select="//captions/learning_center/@caption"/>
                            </a>
                        </li>
                        <li class="">
                            <a href="#cert-authority">
                                <xsl:value-of select="//captions/cert_authority/@caption"/>
                            </a>
                        </li>
                        <li class="">
                            <a href="#about">
                                <xsl:value-of select="//captions/about_us/@caption"/>
                            </a>
                        </li>
                        <div class="dropdown dropdown-lang">
                            <a href="#" class="dropdown-toggle animated fadeInRight" data-toggle="dropdown">
                                <i class="fa fa-globe"></i>
                                <xsl:value-of select="upper-case(//@lang)"/>
                            </a>
                            <ul class="dropdown-menu">
                                <xsl:apply-templates select="//query[@entity = 'language']"/>
                            </ul>
                        </div>
                    </ul>
                </div>
            </div>
        </nav>
    </xsl:template>

    <xsl:template name="promo">
        <div class="promo promo_agency" id="home">
            <div class="container">
                <h1 class="heading promo__heading animated fadeInUp">
                    <xsl:value-of select="//captions/promo_heading/@caption"/>
                </h1>
                <p class="heading__sub promo-heading__sub animated fadeInUp delay_1">
                    <xsl:value-of select="//captions/promo_heading_sub/@caption"/>
                </p>
                <p class="heading__sub promo-heading__experience animated fadeInUp delay_1">
                    <xsl:value-of select="//captions/promo_experience/@caption"/>
                </p>
                <p class="heading__sub promo-heading__experience animated fadeInUp delay_1">
                <a href="#contact" class="promo__btn btn btn-lg btn-primary animated fadeInUp delay_2">
                    <xsl:value-of select="//captions/contact_us/@caption"/>
                </a></p>
                <!--<a href="#skills" class="promo__btn btn btn-lg btn-link animated fadeInUp delay_2">
                    <xsl:value-of select="//captions/find_out_more/@caption"/>
                </a>-->
            </div>
        </div>
    </xsl:template>

    <xsl:template match="//query[@entity = 'language']">
        <xsl:apply-templates select="entry" mode="lang"/>
    </xsl:template>

    <xsl:template match="entry" mode="lang">
        <li>
            <a href="/{lower-case(viewcontent/lang/@id)}">
                <i>
                    <xsl:if test="//request/@lang = viewcontent/lang/@id">
                        <xsl:attribute name="class" select="'active'"/>
                    </xsl:if>
                </i>
                <xsl:value-of select="viewcontent/lang"/>
            </a>
        </li>
    </xsl:template>

</xsl:stylesheet>
