<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="2.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

    <xsl:template name="contact">
        <!-- contact -->
        <section class="section contact" id="contact">
            <div class="container">
                <h1 class="heading">
                    <xsl:value-of select="//captions/contact_us/@caption"/>
                </h1>
                <h2 class="heading__sub">
                    <xsl:value-of select="//captions/contact_us_on_lang/@caption"/>
                </h2>
                <div class="features">
                    <div class="form-group contact-form">
                        <h4>
                            <xsl:value-of select="//captions/message_title/@caption"/>
                        </h4>
                        <!-- Alert message -->
                        <div class="alert contact-form__alert" id="form_message" role="alert"></div>
                        <!-- Contact form -->
                        <form method="post" action="api/service/sendmail" name="contact_us">
                            <fieldset>
                                <div class="form-group">
                                    <input type="email" name="email" placeholder="Yours email"
                                           class="form-control contact-email contact-error" required="required">
                                        <xsl:attribute name="placeholder"
                                                       select="//captions/message_address/@caption"/>
                                    </input>
                                    <span class="help-block"></span>
                                </div>
                                 <div class="form-group">
                                    <textarea name="message" class="form-control contact-error" required="required">
                                        <xsl:attribute name="placeholder"
                                                       select="//captions/message_text/@caption"/>
                                    </textarea>
                                    <span class="help-block"></span>
                                </div>
                                <div class="contact-form__btn">
                                    <div class="form-captcha">
                                        <div class="g-recaptcha"
                                             data-sitekey="6LfmJxEUAAAAAFKE7fAGJi2Gl2gUDAPa_2GI0_rZ"></div>
                                        <div class="help-block"></div>
                                    </div>
                                    <button type="submit" class="btn btn-contact">
                                        <xsl:value-of select="//captions/send_message/@caption"/>
                                    </button>
                                </div>
                            </fieldset>
                        </form>
                    </div>           
                </div>
            </div>
        </section>
        <!-- /contact -->
    </xsl:template>

</xsl:stylesheet>
