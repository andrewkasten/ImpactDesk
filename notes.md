# Backend

## People


| Field      | Validation                            |
| ---------- | --------------------------------------|
| First_Name | CharField, required, max_length 255  |
| Last_name  | CharField,max_length 255             |
| phone      | CharField, max_length 50             |
| email      | EmailField, max_length 255,         |
| street     | CharField, max_length 255            |
| city       | CharField, max_length 255            |
| state      | CharField, max_length 255             |
| zip code   | IntegerField, max_length 255          |


## Organizations


| Field      | Validation                               |
| ---------- | ---------------------------------------- |
| title      | CharField, required, max_length 255      |
| website    | URLField,max_length 255                 |
| phone      | CharField, max_length 50                 |
| email      | EmailField, max_length 255             |
| street     | CharField, max_length 255                |
| city       | CharField, max_length 255                |
| state      | CharField, max_length 255                |
| zip code   | IntegerField, max_length 255             |



## Donations


| Field      | Validation                               |
| ---------- | ---------------------------------------- |
| person      | ForeignKey,                              |
| organization | ForeignKey                             |
| donations    | DecimalField, required, max_digits = 20, decimal_places=2            |
| donate_type  | CharField, max_length 255                |
| date       | DateField, required, default=today          |




## Developments


| Field      | Validation                               |
| ---------- | ---------------------------------------- |
| type      | CharField, required, max_length 255      |
| date    | DateField ,requied, default=today                |
| time      | TimeField,                            |
| end_time      | EmailField,            |
| status | CharField, max_length 10, default Scheduled, choices|
| note     | TextField, max_length 255                |
| city       | CharField, max_length 255                |
| street     | CharField, max_length 255                |
| city       | CharField, max_length 255                |
| state      | CharField, max_length 255                |
| zip code   | IntegerField, max_length 255             |
| street     | CharField, max_length 255                |
| lat       | DecimalField, max_digits=20, decimal_places=15, blank=True, default=0               |
| lng      | DecimalField, max_digits=20, decimal_places=15, blank=True, default=0                |
| people  | ForeignKey             |
| organization |  ForeignKey                        |



