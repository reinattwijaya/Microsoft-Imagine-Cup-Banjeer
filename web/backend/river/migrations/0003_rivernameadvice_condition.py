# Generated by Django 3.0 on 2022-01-26 13:20

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('river', '0002_auto_20220118_2013'),
    ]

    operations = [
        migrations.AddField(
            model_name='rivernameadvice',
            name='condition',
            field=models.CharField(default='bad', max_length=100),
        ),
    ]
