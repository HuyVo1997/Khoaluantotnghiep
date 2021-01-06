package com.microservice.productservice.Aggregate;

import com.microservice.productservice.Commands.Reviews.CreateReviewCommand;
import com.microservice.productservice.Events.Reviews.ReviewCreatedEvent;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.axonframework.commandhandling.CommandHandler;
import org.axonframework.eventsourcing.EventSourcingHandler;
import org.axonframework.modelling.command.AggregateIdentifier;
import org.axonframework.modelling.command.AggregateLifecycle;
import org.axonframework.spring.stereotype.Aggregate;

@Aggregate
@NoArgsConstructor
@AllArgsConstructor
@Getter
public class ReviewAggregate {
    @AggregateIdentifier
    private String commentID;
    private String email;
    private String productID;
    private String title;
    private String content;
    private String dateComment;
    private Integer star;

    @CommandHandler
    public ReviewAggregate(CreateReviewCommand command){
        AggregateLifecycle.apply(new ReviewCreatedEvent(
                command.getCommentID(),
                command.getEmail(),
                command.getProductID(),
                command.getTitle(),
                command.getContent(),
                command.getDateComment(),
                command.getStar()
        ));
    }

    @EventSourcingHandler
    public void on(ReviewCreatedEvent event){
        this.commentID = event.getCommentID();
        this.email = event.getEmail();
        this.productID = event.getProductID();
        this.title = event.getTitle();
        this.content = event.getContent();
        this.dateComment = event.getDateComment();
        this.star = event.getStar();
    }
}
