package projects.model;

import java.util.Date;
import java.util.List;
import java.util.UUID;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToOne;
import javax.persistence.NamedQuery;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

import com.exponentus.common.model.Attachment;
import com.exponentus.dataengine.jpa.SecureAppEntity;
import com.fasterxml.jackson.annotation.JsonIgnore;

import projects.model.constants.ResolutionType;
import reference.model.RequestType;

@Entity
@Table(name = "requests")
@NamedQuery(name = "Request.findAll", query = "SELECT m FROM Request AS m ORDER BY m.regDate")
public class Request extends SecureAppEntity<UUID> {

	@JsonIgnore
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn
	private Task parent;

	@NotNull
	@ManyToOne(optional = false)
	@JoinColumn(nullable = false)
	private RequestType requestType;

	@Enumerated(EnumType.STRING)
	@Column(nullable = true, length = 7, unique = true)
	private ResolutionType resolution = ResolutionType.UNKNOWN;

	@Column(name = "resolution_time")
	private Date resolutionTime;

	@Column(length = 2048)
	private String comment;

	@OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
	@JoinTable(name = "request_attachments", joinColumns = { @JoinColumn(name = "parent_id", referencedColumnName = "id") }, inverseJoinColumns = {
	        @JoinColumn(name = "attachment_id", referencedColumnName = "id") })
	private List<Attachment> attachments;

}
