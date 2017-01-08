<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="2.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

	<xsl:template name="faq">
		<section class="section faq" id="faq">

			<!-- FAQ -->
			<div class="container">
				<div class="row">
					<div class="col-xs-12 animated fadeIn">
						<h3 class="heading heading_center">
							<xsl:value-of select="//captions/faq/@caption" />
							<hr />
						</h3>
					</div>
				</div>
				<div class="row">
					<xsl:value-of select="//template"  disable-output-escaping="yes"/>
				</div>
			</div>
		</section>
	</xsl:template>

</xsl:stylesheet>
