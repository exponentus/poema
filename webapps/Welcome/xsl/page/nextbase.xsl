<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="2.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

	<xsl:template name="nextbase">
		<section class="section skills" id="skills">

			<!-- SKILLS -->
			<div class="container">
				<div class="row">
					<div class="col-xs-12 animated fadeIn">
						<h3 class="heading heading_center">
							<xsl:value-of select="//captions/nextbase_title/@caption" />
							<hr />
						</h3>
					</div>
				</div>
				<xsl:call-template name="skills_feature" />
			</div>
		</section>
	</xsl:template>

	<xsl:template name="skills_feature">
		<div class="row">
			<div class="skills_box skills_box-prog col-xs-6">
				<div class="inner">
					<h3>
						<xsl:value-of select="//captions/skills_prog_lang/@caption" />
					</h3>
					<ul>
						<li>Java (J2EE, Servlets, JPA, Jersey, JasperReports)</li>
						<li>Groovy</li>
						<li>JavaScript (Ember.js, Angular)</li>
						<li>XSLT</li>
						<li>Joomla!</li>
					</ul>
				</div>
			</div>
			<div class="skills_box skills_box-db col-xs-6">
				<div class="inner">
					<h3>
						<xsl:value-of select="//captions/skills_db/@caption" />
					</h3>
					<ul>
						<li>PostgreSQL</li>
						<li>MySQL</li>
						<li>Oracle</li>
					</ul>
				</div>
			</div>
		</div>
		<div class="row">
			<div class="skills_box skills_box-mobile col-xs-6">
				<div class="inner">
					<h3>
						<xsl:value-of select="//captions/skills_mobile_tech/@caption" />
					</h3>
					<ul>
						<li>Android Applications</li>
						<li>IOS Applications</li>
					</ul>
				</div>
			</div>
			<div class="skills_box skills_box-dev-tools col-xs-6">
				<div class="inner">
					<h3>
						<xsl:value-of select="//captions/skills_dev_tools/@caption" />
					</h3>
					<ul>
						<li>Secure hosting of web applications with scalable computational resources</li>
						<li>Infinte cloud storage using Amazon Web Services for additional redundancy</li>
						<li>A/V Media streaming (live and on-demand)</li>
					</ul>
				</div>
			</div>
		</div>
	</xsl:template>

</xsl:stylesheet>
