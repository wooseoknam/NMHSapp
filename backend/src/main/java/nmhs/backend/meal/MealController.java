package nmhs.backend.meal;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class MealController {
    private final Logger log = LoggerFactory.getLogger(this.getClass().getSimpleName());

    private final MealService mealService;

    public MealController(MealService mealService) {
        this.mealService = mealService;
    }

    @PostMapping("/vote")
    @PreAuthorize("isAuthenticated()")
    public void vote(@RequestBody List<Meal> meal) {
        log.info(String.valueOf(meal.size()));
        mealService.vote(meal);
    }
}
