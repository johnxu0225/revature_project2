package com.revature.project2.security.utils;

import org.springframework.stereotype.Component;

import java.lang.reflect.Field;

public class ObjectUpdater {
    public static void copyNonNullValues(Object source, Object target) {
        if (source == null || target == null)
            throw new IllegalArgumentException("Source and target must not be null");
        if (!source.getClass().equals(target.getClass()))
            throw new IllegalArgumentException("Objects must be of the same class");

        Field[] fields = source.getClass().getDeclaredFields();

        for (Field field : fields) {
            try {
                field.setAccessible(true);  // Make private fields accessible
                Object sourceValue = field.get(source);
                Object targetValue = field.get(target);
                if (sourceValue != null && targetValue == null)
                    field.set(target, sourceValue);
            } catch (IllegalAccessException e) {
                e.printStackTrace();
            }
        }
    }
}
