package audit.model;

import javax.persistence.Column;
import javax.persistence.Embeddable;

@Embeddable
public class PlaceOfOrigin {

    @Column(name = "coords_title")
    private String title;

    @Column(name = "coords_latitude")
    private double latitude;

    @Column(name = "coords_longitude")
    private double longitude;

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public double getLatitude() {
        return latitude;
    }

    public void setLatitude(double latitude) {
        this.latitude = latitude;
    }

    public double getLongitude() {
        return longitude;
    }

    public void setLongitude(double longitude) {
        this.longitude = longitude;
    }
}
