package com.revature.project2.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Entity
public class Envelope {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer envelopeId;
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "userId")
    private User user;
    @Column(nullable = false)
    private String envelopeDescription;
    @Column(nullable = false)
    private Double amount;
    @Column(nullable = false)
    private Double maxLimit;

    @Override
    public String toString() {
        return "Envelope{" +
                "envelopeId=" + envelopeId +
                ", user=" + user +
                ", envelopeDescription='" + envelopeDescription + '\'' +
                ", amount=" + amount +
                ", maxLimit=" + maxLimit +
                '}';
    }
}