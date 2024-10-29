from rest_framework import serializers

from .models import Product, Category, Tag


class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ['id', 'name']


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name']


class ProductSerializer(serializers.ModelSerializer):
    tags = TagSerializer(many=True)
    category = CategorySerializer()

    class Meta:
        model = Product
        fields = ['id', 'name', 'description', 'price', 'category', 'tags']

    def create(self, validated_data):
        tags_data = validated_data.pop('tags')
        category_data = validated_data.pop('category')
        category, created = Category.objects.get_or_create(**category_data)
        product = Product.objects.create(category=category, **validated_data)

        for tag_data in tags_data:
            tag, created = Tag.objects.get_or_create(**tag_data)
            product.tags.add(tag)

        return product

    def update(self, instance, validated_data):
        tags_data = validated_data.pop('tags', None)
        category_data = validated_data.pop('category', None)

        if category_data:
            category, created = Category.objects.get_or_create(**category_data)
            instance.category = category

        instance.name = validated_data.get('name', instance.name)
        instance.description = validated_data.get('description', instance.description)
        instance.price = validated_data.get('price', instance.price)
        instance.save()

        if tags_data is not None:
            instance.tags.clear()
            for tag_data in tags_data:
                tag, created = Tag.objects.get_or_create(**tag_data)
                instance.tags.add(tag)

        return instance
